package main

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	//fmt.Println(os.Args)
	searchterm := os.Args[1]

	db, err := sql.Open("mysql", "root:root@tcp(192.168.1.114:3306)/quotee")
	if err != nil {
		panic(err)
	}

	stmtOut, err := db.Prepare("select quote from quotes where quote LIKE ?")
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}
	defer stmtOut.Close()

	var searchquote string
	err = stmtOut.QueryRow("%" + searchterm + "%").Scan(&searchquote)
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app
	}
	fmt.Printf("The quote is: %s", searchquote)

	defer db.Close()
	fmt.Println(searchquote)
}
