# frozen_string_literal: true

# The ApplicationController class is the top-level controller.
class ApplicationController < ActionController::Base
  def index
    render 'application/index'
  end
end
