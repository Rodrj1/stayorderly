export const emptyProjectTemplate = {
  name: '',
  categories: [
    {
      name: 'Todo',
      color: '#c0caf5',
      tasks: [],
    },
    {
      name: 'Doing',
      color: '#FE00EC',
      tasks: [],
    },
    {
      name: 'Completed',
      color: '#4fc5c5',
      tasks: [],
    },
  ],
};

export const emptyTaskTemplate = {
  title: '',
  description: '',
  belongsTo: '',
  status: 'Todo',
  id: "",
};
