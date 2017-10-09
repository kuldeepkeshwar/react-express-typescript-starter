import Sequelize from 'sequelize'
import { sequelize } from 'utils/mysql-client'

const Session = sequelize.define('sessions', {
  session_id: { type: Sequelize.STRING, allowNull: false, unique: 'sessions_compositeIndex' },
  expires: { type: Sequelize.INTEGER, allowNull: false },
  data: { type: Sequelize.STRING(14235) },
}, {
  timestamps: false,
})
Session.sync()
export default Session
