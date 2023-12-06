import React, { useState, useEffect, ChangeEvent } from "react";

interface FocusPageProps {}

interface Task {
  text: string;
  time: number;
  unit: string; // "hour", "minute", "second"
}

interface FocusPageState {
  currentImageIndex: number;
  tasks: Task[];
  newTask: string;
  newTaskTime: number;
  newTaskUnit: string;
  editTaskIndex: number | null;
  runningTaskIndex: number | null;
  timer: number;
}

const FocusPage: React.FC<FocusPageProps> = () => {
  const images: string[] = [
    "https://res.cloudinary.com/dewtlb5rq/image/upload/v1701703755/wallpaper4_jgoocs.png",
    "https://res.cloudinary.com/dewtlb5rq/image/upload/v1701703755/wallpaper3_vsmmzo.png",
    "https://res.cloudinary.com/dewtlb5rq/image/upload/v1701703754/walpppaer2_gibqye.png",
    "https://res.cloudinary.com/dewtlb5rq/image/upload/v1701703753/wallapper1_lvz6ww.png",
  ];

  const initialTime = 60; // Initial time for each task in seconds

  const [state, setState] = useState<FocusPageState>({
    currentImageIndex: 0,
    tasks: [],
    newTask: "",
    newTaskTime: initialTime,
    newTaskUnit: "second",
    editTaskIndex: null,
    runningTaskIndex: null,
    timer: initialTime,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.timer > 0 && state.runningTaskIndex !== null) {
      interval = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          timer: prevState.timer - 1,
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [state.timer, state.runningTaskIndex]);

  const handleNextImage = (): void => {
    const newIndex: number = (state.currentImageIndex + 1) % images.length;
    setState((prevState) => ({ ...prevState, currentImageIndex: newIndex }));
  };

  const handlePrevImage = (): void => {
    const newIndex: number =
      (state.currentImageIndex - 1 + images.length) % images.length;
    setState((prevState) => ({ ...prevState, currentImageIndex: newIndex }));
  };

  const handleAddTask = (): void => {
    if (state.newTask.trim() !== "") {
      const timeInSeconds =
        state.newTaskUnit === "hour"
          ? state.newTaskTime * 3600
          : state.newTaskUnit === "minute"
          ? state.newTaskTime * 60
          : state.newTaskTime;

      const newTask: Task = {
        text: state.newTask.trim(),
        time: timeInSeconds,
        unit: state.newTaskUnit,
      };

      const updatedTasks: Task[] = [...state.tasks, newTask];
      setState((prevState) => ({
        ...prevState,
        tasks: updatedTasks,
        newTask: "",
        newTaskTime: initialTime,
        newTaskUnit: "second",
        runningTaskIndex: null,
        timer: initialTime,
      }));
    }
  };

  const handleEditTask = (index: number): void => {
    const { text, time, unit } = state.tasks[index];
    setState((prevState) => ({
      ...prevState,
      newTask: text,
      newTaskTime: time,
      newTaskUnit: unit,
      editTaskIndex: index,
      runningTaskIndex: null,
      timer: initialTime,
    }));
  };

  const handleStartTask = (): void => {
    if (state.runningTaskIndex === null && state.timer > 0) {
      setState((prevState) => ({
        ...prevState,
        runningTaskIndex:
          state.editTaskIndex !== null
            ? state.editTaskIndex
            : state.tasks.length - 1,
      }));
    }
  };

  const handleUpdateTask = (): void => {
    if (state.newTask.trim() !== "") {
      const timeInSeconds =
        state.newTaskUnit === "hour"
          ? state.newTaskTime * 3600
          : state.newTaskUnit === "minute"
          ? state.newTaskTime * 60
          : state.newTaskTime;

      const updatedTasks: Task[] = [...state.tasks];
      updatedTasks[state.editTaskIndex!] = {
        text: state.newTask.trim(),
        time: timeInSeconds,
        unit: state.newTaskUnit,
      };

      setState((prevState) => ({
        ...prevState,
        tasks: updatedTasks,
        newTask: "",
        newTaskTime: initialTime,
        newTaskUnit: "second",
        editTaskIndex: null,
        runningTaskIndex: null,
        timer: initialTime,
      }));
    }
  };

  const handleDeleteTask = (index: number): void => {
    const updatedTasks: Task[] = state.tasks.filter((_, i) => i !== index);
    setState((prevState) => ({ ...prevState, tasks: updatedTasks }));
  };

  const handleNewTaskChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setState((prevState) => ({ ...prevState, newTask: value }));
  };

  const handleNewTaskTimeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const time = parseInt(value, 10);
    setState((prevState) => ({ ...prevState, newTaskTime: time }));
  };

  const handleNewTaskUnitChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.target;
    setState((prevState) => ({ ...prevState, newTaskUnit: value }));
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="max-w-screen-md mx-auto p-4">
      {/* Imagen actual */}
      <img
        src={images[state.currentImageIndex]}
        alt={`Landscape picture ${state.currentImageIndex + 1}`}
        className="w-full"
      />

      {/* Botones para cambiar la imagen */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevImage}
          className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
        >
          &lt;
        </button>
        <button
          onClick={handleNextImage}
          className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded"
        >
          &gt;
        </button>
      </div>
      {/* Todo List */}
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Todo List</h2>
        <ul>
          {state.tasks.map((task, index) => (
            <li key={index} className="mb-2">
              {task.text} - Tiempo restante: {formatTime(task.time)}
              <button
                onClick={() => handleEditTask(index)}
                className="ml-2 text-blue-500"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteTask(index)}
                className="ml-2 text-red-500"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-2">
          <input
            type="text"
            value={state.newTask}
            onChange={handleNewTaskChange}
            className="border p-2 mr-2"
            placeholder="Nueva tarea"
          />
          <input
            type="number"
            value={state.newTaskTime}
            onChange={handleNewTaskTimeChange}
            className="border p-2 mr-2"
            placeholder="Tiempo"
          />
          <select
            value={state.newTaskUnit}
            onChange={handleNewTaskUnitChange}
            className="border p-2 mr-2"
          >
            <option value="hour">Horas</option>
            <option value="minute">Minutos</option>
            <option value="second">Segundos</option>
          </select>
          {state.editTaskIndex !== null ? (
            <>
              <button
                onClick={handleUpdateTask}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Actualizar Tarea
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleAddTask}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Agregar Tarea
              </button>
              {state.tasks.length > 0 && (
                <button
                  onClick={handleStartTask}
                  className="bg-green-500 text-white px-4 py-2 ml-2 rounded"
                >
                  Iniciar Tarea
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Timer */}
      {state.runningTaskIndex !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Temporizador</h2>
          <p>Tiempo restante: {formatTime(state.timer)}</p>
        </div>
      )}
    </div>
  );
};

export default FocusPage;
