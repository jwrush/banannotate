# frozen_string_literal: true

require 'rails_helper'

RSpec.describe DirectoryController, type: :controller do
  describe 'GET #index' do
    it 'renders the index template' do
      get :index
      expect(response).to render_template(:index)
    end
  end

  describe 'GET #show' do
    it 'renders the show template' do
      # Assuming you have a valid directory ID
      directory = Directory.create(name: 'Test Directory')
      get :show, params: { id: directory.id }
      expect(response).to render_template(:show)
    end
  end
end
