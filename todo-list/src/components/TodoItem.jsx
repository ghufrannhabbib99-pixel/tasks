import { useState } from 'react'

function TodoItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(task.text)
  const [editedDate, setEditedDate] = useState(task.dueDate || '')
  const [editedPriority, setEditedPriority] = useState(
    task.priority
  )
  const [editedCategory, setEditedCategory] = useState(
    task.category
  )

  function handleSave() {
    if (editedText.trim() === '') return

    onEdit(
      task.id,
      editedText,
      editedDate,
      editedPriority,
      editedCategory
    )

    setIsEditing(false)
  }

  function getDueDateStatus() {
    if (!task.dueDate) return null

    const today = new Date()
    const dueDate = new Date(`${task.dueDate}T00:00:00`)

    today.setHours(0, 0, 0, 0)

    if (task.completed) return 'completed'
    if (dueDate < today) return 'overdue'
    if (dueDate.getTime() === today.getTime()) return 'today'

    return 'upcoming'
  }

  function formatDate(date) {
    if (!date) return ''

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }
    )
  }

  const dueDateStatus = getDueDateStatus()

  return (
    <div
      className={`todo-item ${
        task.completed ? 'completed' : ''
      }`}
    >
      <div className="todo-left">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        {isEditing ? (
          <div className="edit-fields">
            <input
              className="edit-text"
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />

            <input
              className="edit-date"
              type="date"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />

            <select
              value={editedPriority}
              onChange={(e) =>
                setEditedPriority(e.target.value)
              }
            >
              <option value="low">🌱 Low</option>
              <option value="medium">🌸 Medium</option>
              <option value="high">🔥 High</option>
            </select>

            <select
              value={editedCategory}
              onChange={(e) =>
                setEditedCategory(e.target.value)
              }
            >
              <option value="study">📚 Study</option>
              <option value="work">💼 Work</option>
              <option value="self-care">🧘 Self Care</option>
              <option value="personal">🏠 Personal</option>
              <option value="other">⭐ Other</option>
            </select>
          </div>
        ) : (
          <div className="task-content">
            <span className="task-title">{task.text}</span>

            <div className="task-meta">
              <small className={`priority ${task.priority}`}>
                {task.priority === 'high' &&
                  '🔥 High priority'}
                {task.priority === 'medium' &&
                  '🌸 Medium priority'}
                {task.priority === 'low' &&
                  '🌱 Low priority'}
              </small>

              <small className={`category ${task.category}`}>
                {task.category === 'study' && '📚 Study'}
                {task.category === 'work' && '💼 Work'}
                {task.category === 'self-care' &&
                  '🧘 Self Care'}
                {task.category === 'personal' &&
                  '🏠 Personal'}
                {task.category === 'other' && '⭐ Other'}
              </small>

              {task.dueDate && (
                <small>📅 {formatDate(task.dueDate)}</small>
              )}

              {dueDateStatus === 'overdue' && (
                <small className="due overdue">
                  ⚠️ Overdue
                </small>
              )}

              {dueDateStatus === 'today' && (
                <small className="due today">
                  🔥 Due today
                </small>
              )}

              {dueDateStatus === 'upcoming' && (
                <small className="due upcoming">
                  🌿 Upcoming
                </small>
              )}

              {dueDateStatus === 'completed' && (
                <small className="due completed">
                  ✅ Completed
                </small>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <button type="button" onClick={handleSave}>
            💾
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
          >
            ✏️
          </button>
        )}

        <button
          type="button"
          onClick={() => onDelete(task.id)}
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default TodoItem