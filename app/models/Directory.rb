# frozen_string_literal: true

# The Directory class is used to represent a directory on disk.
class Directory
  attr_reader :path

  IMAGE_EXTENSIONS = %w[.jpg .jpeg .png].freeze

  # The DirectoryNotFoundError is raised when the directory does not exist.
  class DirectoryNotFoundError < StandardError
    def initialize(message = 'Directory not found')
      super(message)
    end
  end

  def initialize(path)
    raise DirectoryNotFoundError unless Dir.exist?(path)

    @path = path
  end

  def list_files
    Dir.entries(path).select { |f| image?(f) }
       .map do |f|
      {
        'filename' => f,
        'url' => "/image/#{Base64.encode64("#{path}/#{f}")}/show"
      }
    end
  end

  def to_json(*_options)
    {
      'path' => @path,
      'files' => list_files
    }.to_json(*_options)
  end

  def self.json_create(hash)
    new(hash['path'])
  end

  private

  def image?(file)
    file.end_with?(*IMAGE_EXTENSIONS)
  end
end
