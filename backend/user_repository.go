package main

import (
	"errors"
	"sync"
)

type InMemoryUserStorage struct {
	lock    sync.RWMutex
	storage map[string]User
}

func NewInMemoryUserStorage() *InMemoryUserStorage {
	return &InMemoryUserStorage{
		lock:    sync.RWMutex{},
		storage: make(map[string]User),
	}
}

func (userStorage *InMemoryUserStorage) Add(email string, user User) error {
	if _, ok := userStorage.storage[email]; ok {
		return errors.New("this user allready exists")
	} else {
		userStorage.storage[email] = user
		return nil
	}
}

func (userStorage *InMemoryUserStorage) Get(email string) (User, error) {
	if user, ok := userStorage.storage[email]; ok {
		return user, nil
	} else {
		return User{}, errors.New("invalid email or password")
	}
}

func (userStorage *InMemoryUserStorage) Update(email string, user User) error {
	if _, ok := userStorage.storage[email]; !ok {
		return errors.New("invalid email or password")
	} else {
		userStorage.storage[email] = user
		return nil
	}
}

func (userStorage *InMemoryUserStorage) Delete(email string) (User, error) {
	if user, ok := userStorage.storage[email]; !ok {
		return User{}, errors.New("no such user")
	} else {
		delete(userStorage.storage, email)
		return user, nil
	}
}
