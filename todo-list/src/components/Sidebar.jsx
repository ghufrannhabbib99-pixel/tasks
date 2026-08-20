function Sidebar({
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter,
}) {
  function clearFilters() {
    setFilter('all')
    setCategoryFilter('all')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">🦋</div>

      <nav className="sidebar-nav">
        <button
          className={
            filter === 'all' && categoryFilter === 'all'
              ? 'sidebar-active'
              : ''
          }
          onClick={clearFilters}
        >
          🏠 Home
        </button>

        <button
          className={
            filter === 'today' ? 'sidebar-active' : ''
          }
          onClick={() => {
            setFilter('today')
            setCategoryFilter('all')
          }}
        >
          📅 Today
        </button>

        <button
          className={
            filter === 'upcoming'
              ? 'sidebar-active'
              : ''
          }
          onClick={() => {
            setFilter('upcoming')
            setCategoryFilter('all')
          }}
        >
          📆 Upcoming
        </button>

        <button
          className={
            filter === 'completed'
              ? 'sidebar-active'
              : ''
          }
          onClick={() => {
            setFilter('completed')
            setCategoryFilter('all')
          }}
        >
          ✅ Completed
        </button>
      </nav>

      <div className="sidebar-section">
        <h3>Categories</h3>

        <button
          className={
            categoryFilter === 'study'
              ? 'sidebar-active'
              : ''
          }
          onClick={() => {
            setCategoryFilter('study')
            setFilter('all')
          }}
        >
          📚 Study
        </button>

        <button
          className={
            categoryFilter === 'work'
              ? 'sidebar-active'
              : ''
          }
          onClick={() => {
            setCategoryFilter('work')
            setFilter('all')
          }}
        >
          💼 Work
        </button>

        <button
          className={
            categoryFilter === 'self-care'
              ? 'sidebar-active'
              : ''
          }
          onClick={() => {
            setCategoryFilter('self-care')
            setFilter('all')
          }}
        >
          🧘 Self Care
        </button>

        <button
          className={
            categoryFilter === 'personal'
              ? 'sidebar-active'
              : ''
          }
          onClick={() => {
            setCategoryFilter('personal')
            setFilter('all')
          }}
        >
          🏠 Personal
        </button>

        <button
          className={
            categoryFilter === 'other'
              ? 'sidebar-active'
              : ''
          }
          onClick={() => {
            setCategoryFilter('other')
            setFilter('all')
          }}
        >
          ⭐ Other
        </button>
      </div>
    </aside>
  )
}

export default Sidebar