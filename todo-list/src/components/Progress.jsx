import { DotLottieReact } from '@lottiefiles/dotlottie-react'

function Progress({ progress, completedTasks, totalTasks }) {
  return (
    <section className="progress-section">

      <div className="progress-info">
        <span>✨ Today's Progress</span>
        <span>{progress}%</span>
      </div>

      <div className="progress-animation">
        <DotLottieReact
          src="https://lottie.host/128cbe90-984e-412e-86ed-f325fd882f2a/dcfToZKhAW.lottie"
          loop
          autoplay
        />
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p>
        {completedTasks} of {totalTasks} goals completed 🎀
      </p>

    </section>
  )
}

export default Progress