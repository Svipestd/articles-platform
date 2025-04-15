import { FC, memo, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Code.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, ButtonVariant } from '../Button/Button';
import { FaCopy } from 'react-icons/fa';
import { Icon, IconColor, IconSize } from '../Icon/Icon';

interface CodeProps {
  className?: string;
  children?: React.ReactNode;
  text: string;
}

export const Code: FC<CodeProps> = memo((props) => {
  const { className = '', text } = props;
  const { t } = useTranslation();

  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button className={cls.copyBtn} variant={ButtonVariant.TEXT} onClick={onCopy}>
        <Icon Svg={FaCopy} color={IconColor.SECONDARY_INVERTED} size={IconSize.S} />
      </Button>

      <code>{text}</code>
    </pre>
  );
});
