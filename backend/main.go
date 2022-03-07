package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/rs/cors"

	"github.com/gorilla/mux"
)

func wrapJwt(jwt *JWTService, f func(http.ResponseWriter, *http.Request, *JWTService),
) http.HandlerFunc {
	return func(rw http.ResponseWriter, r *http.Request) {
		f(rw, r, jwt)
	}
}

func router(u *UserService, jwtService *JWTService) *mux.Router { // Creating router function in order to not to use same code in tests over and over again
	r := mux.NewRouter()

	r.HandleFunc("/user/signup", u.Register).Methods(http.MethodPost)
	r.HandleFunc("/user/signin", wrapJwt(jwtService, u.JWT)).Methods(http.MethodPost)
	
	return r
}

func main() {
	users := NewInMemoryUserStorage()
	userService := UserService{repository: users}

	jwtService, err := NewJWTService("pubkey.rsa", "privkey.rsa")

	if err != nil {
		panic(err)
	}

	r := router(&userService, jwtService)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowCredentials: true,
		AllowedMethods: []string{
			http.MethodGet, //http methods for your app
			http.MethodPost,
			http.MethodPut,
			http.MethodPatch,
			http.MethodDelete,
			http.MethodOptions,
			http.MethodHead,
		},
		AllowedHeaders: []string{"*"},
	})

	handler := c.Handler(r)

	srv := http.Server{
		Addr:    ":8080",
		Handler: handler,
	}

	interrupt := make(chan os.Signal, 1)
	signal.Notify(interrupt, os.Interrupt)

	go func() {
		<-interrupt
		ctx, cancel := context.WithTimeout(context.Background(),
			5*time.Second)
		defer cancel()
		srv.Shutdown(ctx)
	}()

	log.Println("Server started, hit Ctrl+C to stop")
	err1 := srv.ListenAndServe()

	if err1 != nil {
		log.Println("Server exited with error:", err)
	}
	log.Println("Good bye :)")
}
