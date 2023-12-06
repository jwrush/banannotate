# frozen_string_literal: true

# The Image class is used to represent a directory on disk.
class Image
  attr_reader :path

  def initialize(path)
    @path = path
  end

  def caption_exists?
    File.exist?(caption_path)
  end

  def caption_path
    path.gsub(/\.[^.]+\z/, '.txt')
  end

  def caption
    return nil unless caption_exists?

    File.read(caption_path)
  end
end
