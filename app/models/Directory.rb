# frozen_string_literal: true

class Directory
  attr_reader :path

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
