import { useEffect, useState } from 'react'
import './App.css'

import Header from './components/Header'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import Progress from './components/Progress'
import Sidebar from './components/Sidebar'

function getLocalDateString() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('myLittleGoals')
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  const [filter, setFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('myLittleGoals', JSON.stringify(tasks))
  }, [tasks])

  function addTask(taskText, priority, category, dueDate) {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      priority,
      category,
      dueDate,
    }

    setTasks((currentTasks) => [...currentTasks, newTask])
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  function deleteTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    )
  }

  function editTask(
    id,
    newText,
    newDueDate,
    newPriority,
    newCategory
  ) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              text: newText,
              dueDate: newDueDate,
              priority: newPriority,
              category: newCategory,
            }
          : task
      )
    )
  }

  function clearCompleted() {
    const shouldDelete = window.confirm(
      'Are you sure you want to remove all completed goals?'
    )

    if (!shouldDelete) return

    setTasks((currentTasks) =>
      currentTasks.filter((task) => !task.completed)
    )
  }

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length

  const remainingTasks = tasks.length - completedTasks

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100)

  const todayString = getLocalDateString()

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      filter === 'all' ||
      (filter === 'today' &&
        task.dueDate === todayString) ||
      (filter === 'upcoming' &&
        task.dueDate &&
        task.dueDate > todayString &&
        !task.completed) ||
      (filter === 'completed' && task.completed)

    const matchesCategory =
      categoryFilter === 'all' ||
      task.category === categoryFilter

    return matchesStatus && matchesCategory
  })

  return (
    <div className="layout">
      <Sidebar
        filter={filter}
        setFilter={setFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      <main className="app">
        <Header />

        <TodoForm onAddTask={addTask} />

        <Progress
          progress={progress}
          completedTasks={completedTasks}
          totalTasks={tasks.length}
        />

        <div className="goals-header">
          <h2>My Goals</h2>
          <span>
            {filteredTasks.length}{' '}
            {filteredTasks.length === 1 ? 'goal' : 'goals'}
          </span>
        </div>

        <div className="todo-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={editTask}
              />
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🌱</div>
              <strong>No goals here yet</strong>
              <span>Add a goal and make a little progress.</span>
            </div>
          )}
        </div>

        <div className="tasks-summary">
          {tasks.length === 0
            ? '🌱 Add your first goal!'
            : remainingTasks === 0
              ? '🎉 All goals complete!'
              : `${remainingTasks} ${
                  remainingTasks === 1 ? 'goal' : 'goals'
                } left`}
        </div>

        {completedTasks > 0 && (
          <div className="clear-completed-wrap">
            <button
              className="clear-completed"
              onClick={clearCompleted}
            >
              🧹 Clear completed
            </button>
          </div>
        )}

        {progress === 100 && tasks.length > 0 && (
          <div className="success-message">
            🎉 You did it! All your goals are complete!
          </div>
        )}
      </main>
    </div>
  )
}

export default App