import { create } from "zustand";

export type Student = {
  id: number;
  name: string;
  subject: string;
  duration: number;
  timeLeft: number;
  isActive: boolean;
  isCompleted: boolean;
  startTime: Date | null;
  endTime: Date | null;
};

interface StudentState {
  students: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (id: number) => void;
  handleStart: (id: number) => void;
  handlePause: (id: number) => void;
  handleReset: (id: number) => void;
}

const useStudentStore = create<StudentState>((set) => ({
  students: [],
  addStudent: (student) => {
    set((state) => ({
      students: [...state.students, student],
    }));
  },
  updateStudent: (student) => {
    set((state) => ({
      students: state.students.map((s) =>
        s.id === student.id ? student : s
      ),
    }));
  },
  deleteStudent: (id: number) => {
    set((state) => ({
      students: state.students.filter((s) => s.id !== id),
    }));
  },
  handleStart: (id: number) => {
    set((state) => ({
      students: state.students.map((s) =>
        s.id === id
          ? {
              ...s,
              isActive: true,
              isCompleted: false,
              startTime: new Date(),
              endTime: new Date(
                new Date().getTime() + s.duration * 1000
              ),
            }
          : s
      ),
    }));
  },
  handlePause: (id: number) => {
    set((state) => ({
      students: state.students.map((s) =>
        s.id === id
          ? {
              ...s,
              isActive: false,
            }
          : s
      ),
    }));
  },
  handleReset: (id: number) => {
    set((state) => ({
      students: state.students.map((s) =>
        s.id === id
          ? {
              ...s,
              isActive: false,
              isCompleted: false,
              timeLeft: s.duration,
              startTime: null,
              endTime: null,
            }
          : s
      ),
    }));
  },
}));

export default useStudentStore;
