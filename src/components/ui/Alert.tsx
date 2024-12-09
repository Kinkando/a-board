import { useEffect, useState } from 'react';
import { Alert as AlertComponent } from 'flowbite-react';
import { Severity } from '@/core/@types/alert';

type AlertProps = {
  isOpen?: boolean;
  onDismiss: (alert: boolean) => void;
  severity: Severity;
  message: string;
};

export default function Alert({
  isOpen,
  onDismiss,
  severity,
  message,
}: AlertProps) {
  const [_message, _setMessage] = useState('');
  const [_severity, _setSeverity] = useState<Severity>('info');

  useEffect(() => {
    if (isOpen && !_message) {
      let timeout = 1;
      _setSeverity(severity);
      _setMessage(message);
      const interval = setInterval(() => {
        if (timeout > 0) {
          timeout--;
        } else {
          clearInterval(interval);
          onDismiss(false);
          _setMessage('');
        }
      }, 1000);
    }
  }, [isOpen, message, onDismiss, severity, _message]);

  return (
    <div
      className={
        'fixed top-6 left-0 right-0 w-fit m-auto flex flex-col justify-start items-center z-[1000]' +
        (!isOpen || !message ? ' -z-[1000]' : '')
      }
    >
      <div
        className={
          isOpen && message
            ? 'opacity-1 ease-in duration-150 transition-all'
            : 'opacity-0'
        }
      >
        <div className="mx-4 shadow-lg">
          <AlertComponent
            color={_severity === 'error' ? 'red' : _severity}
            withBorderAccent
          >
            <div className="flex items-center gap-2">
              <span slot="icon">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
              <span className="mr-2">{_message}</span>
            </div>
          </AlertComponent>
        </div>
      </div>
    </div>
  );
}
