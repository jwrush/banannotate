Rails.application.routes.draw do
  resources :directory, only: [:index, :show]
end
