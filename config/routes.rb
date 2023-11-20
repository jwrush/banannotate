# frozen_string_literal: true

Rails.application.routes.draw do
  resources :directory, only: %i[index show]
end
