import { atom } from 'recoil'

interface TableEditor {
  selectedItem: {
    id: string;
    name: string;
  };
  isEditing: boolean;
  isDeleting: boolean;
  pagination: {
    page: number;
    pageSize: number;
    totalPage: number;
    totalData: number;
  }
}

const tableEditorState = atom<TableEditor>({
  key: 'tableEditorState',
  default: {
    selectedItem: {
      id: '',
      name: '',
    },
    isEditing: false,
    isDeleting: false,
    pagination: {
      page: 1,
      pageSize: 10,
      totalPage: 1,
      totalData: 0,
    }
  }
})

export { tableEditorState }
