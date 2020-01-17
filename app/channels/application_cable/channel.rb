module ApplicationCable
  class Channel < ActionCable::Channel::Base
    def connections_info
      connections_array = []
      # p connection.server.connections.length
      connection.server.connections.each do |conn|
        conn_hash = {}
        conn_hash[:current_user] = conn.user_id
        conn_hash[:subscriptions_identifiers] = conn.subscriptions.identifiers.map {|k| JSON.parse k}
        connections_array << conn_hash
      end
      connections_array.uniq
    end
  end
end
