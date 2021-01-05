import Quiz from './components/Quiz';
import { pixar } from './data/quizzes';

function App() {
  return (
    <div className="container-fluid">
      <header className="App-header h1">Quiz: {pixar.title}</header>

      <section className="quiz">
        <Quiz questions={pixar.questions} />
      </section>
    </div>
  );
}

export default App;
