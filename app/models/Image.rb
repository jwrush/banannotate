# frozen_string_literal: true

class Image
  attr_reader :path

  def initialize(path)
    @path = path
  end

  def caption_exists?
    file.exist?(caption_path)
  end

  def caption_path
    "#{path}.txt"
  end
end
