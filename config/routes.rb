# frozen_string_literal: true

Rails.application.routes.draw do
  resources :directory, only: %i[index show]

  root 'application#index'

  # Add routes for directory_controller
  get '/directory/:path/show', to: 'directory#show'

  get '/image/:path', to: 'image#show'
  get '/image/:path/caption', to: 'image#caption'
  put '/image/:path/caption', to: 'image#update_caption'
end
