type IResponseData = Record<string, unknown> | unknown[]; // Generic data type for payload or error
type IBaseResponseProps = {
  message: string;
  status: EResponseStatus;
  data?: IResponseData;
  error?: Error | string;
};

interface IOkResponseProps {
  message?: string;
  data?: IResponseData;
}

interface INotOkResponseProps {
  message?: string;
  error?: Error | string | undefined;
}