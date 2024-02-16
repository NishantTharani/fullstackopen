type HeaderProps = {
  courseName: string;
};

const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>;
};

type CoursePart = {
  name: string;
  exerciseCount: number;
};

type ContentProps = {
  courseParts: CoursePart[];
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((coursePart) => {
        return (
          <p key={coursePart.name}>
            {coursePart.name} {coursePart.exerciseCount}
          </p>
        );
      })}
    </div>
  );
};

type TotalProps = {
  total: number;
};

const Total = (props: TotalProps) => {
  return <p>Number of exercises {props.total}</p>;
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;
