import { useState } from 'react'

function TodoForm({ onAddTask }) {
  const [task, setTask] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('personal')
  const [dueDate, setDueDate] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (task.trim() === '') return

    onAddTask(task, priority, category, dueDate)

    setTask('')
    setPriority('medium')
    setCategory('personal')
    setDueDate('')
  }

  function formatDate(date) {
    if (!date) return 'Choose a date'

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      'en-US',
      {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }
    )
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="task-input"
        type="text"
        placeholder="What do you want to achieve? ✨"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <div className="todo-options">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">🌱 Low</option>
          <option value="medium">🌸 Medium</option>
          <option value="high">🔥 High</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="study">📚 Study</option>
          <option value="work">💼 Work</option>
          <option value="self-care">🧘 Self Care</option>
          <option value="personal">🏠 Personal</option>
          <option value="other">⭐ Other</option>
        </select>

        <div className="date-picker-wrapper">
          <div className="date-display">
            <span>📅</span>
            <span>{formatDate(dueDate)}</span>
          </div>

          <input
            className="hidden-date-input"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            aria-label="Choose a due date"
          />
        </div>

        <button className="add-goal-button" type="submit">
          + Add Goal
        </button>
      </div>
    </form>
  )
}

export default TodoForm