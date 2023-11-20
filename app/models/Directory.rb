# frozen_string_literal: true

# The Directory class is used to represent a directory on disk.
class Directory
  attr_reader :path

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
    raise NotImplementedError, 'The list_files method is not implemented yet.'
  end
end
