# frozen_string_literal: true

require 'base64'

# The DirectoryController class is used to represent a directory on disk.
class DirectoryController < ApplicationController
  def show
    render json: directory
  rescue Directory::DirectoryNotFoundError => e
    render json: { error: e.message }, status: :not_found
  end

  private

  def directory
    @directory ||= Directory.new(path)
  end

  def path
    @path ||= Base64.decode64(params[:path])
  end
end
