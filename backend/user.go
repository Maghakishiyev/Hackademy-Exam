package main

import (
	"crypto/md5"
	"encoding/json"
	"errors"
	"net/http"
	"net/mail"
)

type User struct {
	Email          string
	PasswordDigest string
}

type UserRepository interface {
	Add(string, User) error
	Get(string) (User, error)
	Update(string, User) error
	Delete(string) (User, error)
}

type UserService struct {
	repository UserRepository
}

type UserRegisterParams struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func validateRegisterParams(p *UserRegisterParams) error {
	if _, err := mail.ParseAddress(p.Email); err != nil { // Email validity
		return errors.New("you must provide an email address")
	}

	if len(p.Password) <= 0 { // Password validity
		return errors.New("password must be at least 8 symbols")
	}

	return nil
}

func handleUnprocError(err error, w http.ResponseWriter) {
	handleError(err, w)
}

func handleUnauthError(err error, w http.ResponseWriter) {
	handleError(err, w)
}

func handleError(err error, w http.ResponseWriter) {
	w.WriteHeader(http.StatusUnprocessableEntity)
	w.Write([]byte(err.Error()))
}

func (u *UserService) Register(w http.ResponseWriter, r *http.Request) {

	params := &UserRegisterParams{}
	err := json.NewDecoder(r.Body).Decode(params)

	if err != nil {
		handleError(errors.New("could not read params"), w)
		return
	}

	if err := validateRegisterParams(params); err != nil {
		handleError(err, w)
		return
	}

	passwordDigest := md5.New().Sum([]byte(params.Password))

	newUser := User{
		Email:          params.Email,
		PasswordDigest: string(passwordDigest),
	}

	err = u.repository.Add(params.Email, newUser)

	if err != nil {
		handleError(err, w)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("registered"))
}


