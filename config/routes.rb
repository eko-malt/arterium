Rails.application.routes.draw do
  root to: 'pages#index'
  get '/list', to: 'pages#list'
  get '/xls', to: 'pages#results'
  get '/test', to: 'pages#test'
  resources :doctors
end