# frozen_string_literal: true

# The ImageController class is the controller for images
class ImageController < ApplicationController
  def show
    send_file image.path, disposition: 'inline'
  end

  def caption
    render json: { caption: image.caption }
  end

  def update_caption
    File.open(image.caption_path, 'w') do |file|
      file.write(params[:caption])
    end

    render json: { caption: image.caption }
  end

  private

  def image
    @image ||= Image.new(path)
  end

  def path
    @path ||= Base64.decode64(params[:path])
  end
end
