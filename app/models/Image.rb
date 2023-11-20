# frozen_string_literal: true

# The Image class is used to represent a directory on disk.
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
