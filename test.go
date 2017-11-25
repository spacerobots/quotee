package main

import (
	"database/sql"
	"fmt"
	"math/rand"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", "root:root@/quotee")

	if err != nil {
		panic(err)
	}

	defer db.Close()

	stmt, err := db.Prepare("select quote from quotes where id = ?")

	if err != nil {
		panic(err)
	}

	defer stmt.Close()

	src := rand.NewSource(time.Now().UnixNano())
	r := rand.New(src)
	randNum := r.Intn(398)

	var quote string
	err = stmt.QueryRow(randNum).Scan(&quote)

	if err != nil {
		panic(err)
	}

	fmt.Println()
	fmt.Println(quote)
	fmt.Println()
}
