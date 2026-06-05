import { CircleX, Bell, Check, TriangleAlert } from 'lucide-react'

function Footer() {
  return (
    <section className="footer">
      <div className="projectinfo-left">
        <button className="problem-info" title="Errors">
          <CircleX size={18} />
          <input
            onClick={() => alert('ERROR COUNTER')}
            type="button"
            value="0"
          />
        </button>
        <button className="problem-info" title="Warnings">
          <TriangleAlert size={18} />
          <input
            onClick={() => alert('WARNING COUNTER')}
            type="button"
            value="0"
          />
        </button>
      </div>
      <div className="copyright-info">
        <p>&copy; ProjFront - Copyright by Team 12</p>
      </div>
      <div className="projectinfo-right">
        <button className="prettier-button" title="Prettier">
          <Check size={18} />
          <input
            onClick={() => alert('PRETTIER')}
            type="button"
            value="Prettier"
          />
        </button>
        <button
          onClick={() => alert('NOTIFICATIONS')}
          className="notifications"
          title="Notifications"
        >
          <Bell size={18} />
        </button>
      </div>
    </section>
  )
}

export default Footer
