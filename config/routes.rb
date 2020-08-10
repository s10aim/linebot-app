Rails.application.routes.draw do
  root "posts#index"
  resources :posts
  devise_for :users, controllers: {
                       omniauth_callbacks: "omniauth_callbacks",
                     }
end
