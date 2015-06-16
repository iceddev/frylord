'use strict';

const statuses = {
  // directory actions
  DIRECTORY_CHANGE_PROGRESS: 'Changing directory to \'${cwd}\'.',
  DIRECTORY_CHANGE_SUCCESS: 'Directory changed to \'${cwd}\'.',
  DIRECTORY_CHANGE_FAILURE: '${error.message}',
  DIRECTORY_DELETE_PROGRESS: 'Deleting \'${cwd}\'.',
  DIRECTORY_DELETE_SUCCESS: '\'{cwd}\' deleted successfully.',
  DIRECTORY_DELETE_FAILURE: '${error.message}',
  // file actions
  FILE_LOAD_PROGRESS: 'Loading \'${filename}\'.',
  FILE_LOAD_SUCCESS: '\'${filename}\' loaded successfully.',
  FILE_LOAD_FAILURE: '${error.message}',
  FILE_SAVE_PROGRESS: 'Saving \'${filename}\'.',
  FILE_SAVE_SUCCESS: '\'${filename}\' saved successfully.',
  FILE_SAVE_FAILURE: '${error.message}',
  FILE_DELETE_PROGRESS: 'Deleting \'${filename}\'.',
  FILE_DELETE_SUCCESS: '\'${filename}\' deleted successfully.',
  FILE_DELETE_FAILURE: '${error.message}'
};

module.exports = statuses;
