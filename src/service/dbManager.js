/* eslint-disable no-shadow */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import SQLite from 'react-native-sqlite-storage'
import FastImage from 'react-native-fast-image'
import { BY_CATEGORY, BY_BOUTIQUE_IDS, BY_SEARCH_TEXT, BY_TRADING_HOUSE } from '../constants/static'

SQLite.DEBUG(false)
SQLite.enablePromise(true)

const database_name = 'testDB'
const database_version = '1.0'
const database_displayname = 'SQLite React Offline Database'
const database_size = 200000

export default class Database {
  initDB() {
    let db
    return new Promise((resolve) => {
      SQLite.echoTest()
        .then(() => {
          SQLite.openDatabase(
            database_name,
            database_version,
            database_displayname,
            database_size
          )
            .then(DB => {
              db = DB
              db.executeSql('SELECT 1 FROM Boutique LIMIT 1').then(() => {
                db.executeSql('SELECT 1 FROM Word LIMIT 1').then(() => {
                  resolve(db)
                }).catch((error) => {
                  console.log('Received error: ', error)
                  db.transaction((tx) => {
                    tx.executeSql('CREATE TABLE IF NOT EXISTS Word (id, text)')
                  }).then(() => {
                    console.log('Table Word created successfully')
                  }).catch(error => {
                    console.log(error)
                  }).done(() => {
                    resolve(db)
                  })
                })
              }).catch((error) => {
                console.log('Received error: ', error)
                db.transaction((tx) => {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS Boutique (id, name, categories, trading_house, boutique, date)')
                }).then(() => {
                  console.log('Table Boutique created successfully')
                }).catch(error => {
                  console.log(error)
                }).done(() => {
                  db.executeSql('SELECT 1 FROM Word LIMIT 1').then(() => {
                    resolve(db)
                  }).catch((error) => {
                    console.log('Received error: ', error)
                    db.transaction((tx) => {
                      tx.executeSql('CREATE TABLE IF NOT EXISTS Word (id, text)')
                    }).then(() => {
                      console.log('Table Word created successfully')
                    }).catch(error => {
                      console.log(error)
                    }).done(() => {
                      resolve(db)
                    })
                  })
                })
              })
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          console.log('echoTest failed - plugin not functional')
        })
    })
  }

  closeDatabase(db) {
    if (db) {
      db.close()
        .then(status => {
        })
        .catch(error => {
          this.errorCB(error)
        })
    } else {
      console.log('Database was not OPENED')
    }
  }

  errorCB(error) {
    console.log(error)
  }

  checkData() {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM Boutique  LIMIT 1', []).then(([tx, results]) => {
            const len = results.rows.length
            if (len > 0) {
              const row = results.rows.item(0)
              resolve(row)
            } else {
              resolve(undefined)
            }
          })
        }).then((result) => {
          this.closeDatabase(db)
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  getBoutiqueList(params) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          const { cat_id, filter, ids, text, trading_house_id } = params
          let param = ''
          switch (filter) {
            case BY_CATEGORY:
              param += `categories like '(${cat_id})'`
              break
            case BY_BOUTIQUE_IDS:
              param += `id in (${ids.join()})`
              break
            case BY_SEARCH_TEXT:
              param += `name like '%${text}%'`
              break
            case BY_TRADING_HOUSE:
              param += `trading_house=${trading_house_id}`
              break

            default:
              return resolve({
                payload: {
                  list: [],
                  trading_houses: [],
                  hits: [],
                  error: 'No filter to search'
                }
              })
          }
          tx.executeSql(`SELECT * FROM Boutique WHERE ${param}`).then(([tx, results]) => {
            const len = results.rows.length
            const data = []
            for (let i = 0; i < len; i += 1) {
              const row = results.rows.item(i)
              const { boutique } = row
              data.push(JSON.parse(boutique))
            }
            const trading_houses = []
            data.map(el => {
              const house = el.trading_house
              if (house && !trading_houses.find((dir) => dir.id === house.id)) {
                trading_houses.push(house)
              }
              return null
            })
            resolve({
              payload: {
                trading_houses,
                list: data,
                hits: data.filter(el => el.is_hit === 1)
              }
            })
          })
        }).then((result) => {
          this.closeDatabase(db)
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  getWordsList(word) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          const param = `lower(text) like '%${word.toLowerCase()}%'`
          tx.executeSql(`SELECT * FROM Word WHERE ${param} COLLATE BINARY`).then(([tx, results]) => {
            const len = results.rows.length
            const data = []
            for (let i = 0; i < len; i += 1) {
              const row = results.rows.item(i)
              const { text } = row
              data.push(text)
            }
            resolve(data)
          })
        }).then((result) => {
          this.closeDatabase(db)
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  addBoutique(rows) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          //CREATE TABLE IF NOT EXISTS Boutique (id, name, categories, trading_house, boutique, date)
          const len = rows.length
          for (let i = 0; i < len; i += 1) {
            const row = rows[i]
            const { boutique: { img, images, qr_code, trading_house, map } } = row
            FastImage.preload([img, ...images])
            if (qr_code) {
              FastImage.preload([qr_code])
            }
            if (trading_house && trading_house.img) {
              FastImage.preload([trading_house.img])
            }
            if (map) {
              FastImage.preload([...map])
            }
            tx.executeSql('INSERT INTO Boutique VALUES (?, ?, ?, ?, ?, ?)', [row.id, row.name, row.categories, row.trading_house, JSON.stringify(row.boutique), new Date().toString()])
            //.then(([tx, results]) => {})
          }
          resolve([])
        }).then((result) => {
          this.closeDatabase(db)
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  addWords(rows) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          //CREATE TABLE IF NOT EXISTS Boutique (id, name, categories, trading_house, boutique, date)
          const len = rows.length
          for (let i = 0; i < len; i += 1) {
            const row = rows[i]
            tx.executeSql('INSERT INTO Word VALUES (?, ?)', [row.id, row.text])
          }
          resolve([])
        }).then((result) => {
          this.closeDatabase(db)
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  updateBoutique(id, row) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('UPDATE Boutique SET name = ?, categories = ?, trading_house = ?, boutique = ? WHERE id = ?', [row.text, row.categoryId, row.trading_house_id, JSON.stringify(row), id]).then(([tx, results]) => {
            resolve(results)
          })
        }).then((result) => {
          this.closeDatabase(db)
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    })
  }


  getBoutiqueById(id) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('SELECT * FROM Boutique WHERE id = ?', [id]).then(([tx, results]) => {
            const len = results.rows.length
            if (len > 0) {
              const row = results.rows.item(0)
              resolve(row)
            } else {
              resolve(undefined)
            }
          })
        }).then((result) => {
          this.closeDatabase(db)
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  deleteBoutique(id) {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('DELETE FROM Boutique WHERE id = ?', [id]).then(([tx, results]) => {
            resolve(results)
          })
        }).then((result) => {
          this.closeDatabase(db)
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  deleteAllBoutique() {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('DELETE FROM Boutique ').then(([tx, results]) => {
            resolve(results)
          })
        }).then((result) => {
          this.closeDatabase(db)
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    })
  }

  deleteAllWords() {
    return new Promise((resolve) => {
      this.initDB().then((db) => {
        db.transaction((tx) => {
          tx.executeSql('DELETE FROM Word ').then(([tx, results]) => {
            resolve(results)
          })
        }).then((result) => {
          this.closeDatabase(db)
        }).catch((err) => {
          console.log(err)
        })
      }).catch((err) => {
        console.log(err)
      })
    })
  }
}
