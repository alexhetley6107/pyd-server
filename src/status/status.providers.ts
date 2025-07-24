import { Status } from './status.model';

export const STATUS_REPOSITORY = 'status_repository';

export const statusProviders = [
  {
    provide: STATUS_REPOSITORY,
    useValue: Status,
  },
];
