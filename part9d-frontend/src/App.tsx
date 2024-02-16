interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseWithDescription {
  kind: "basic";
}

interface CoursePartSpecial extends CoursePartBaseWithDescription {
  requirements: string[];
  kind: "special";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBaseWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

type HeaderProps = {
  courseName: string;
};

const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>;
};

type PartProps = {
  coursePart: CoursePart;
};

const Part = (props: PartProps) => {
  switch (props.coursePart.kind) {
    case "basic":
      return (
        <p>
          {props.coursePart.name} {props.coursePart.exerciseCount}
        </p>
      );
    case "group":
      return (
        <p>
          {props.coursePart.name} {props.coursePart.exerciseCount}
          {props.coursePart.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          {props.coursePart.name} {props.coursePart.exerciseCount}
        </p>
      );
    case "special":
      return (
        <p>
          {props.coursePart.name} {props.coursePart.exerciseCount}{" "}
          {props.coursePart.requirements}
        </p>
      );
    default:
      return <p>Unknown part</p>;
  }
};

type ContentProps = {
  courseParts: CoursePart[];
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((coursePart) => {
        return <Part key={coursePart.name} coursePart={coursePart} />;
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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
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
