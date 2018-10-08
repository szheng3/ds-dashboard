export interface DvaProps {
  dispatch?({
              type: string,
              payload: object,
            });

  loading?: boolean
}
