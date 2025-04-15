import { FC, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './DisplaySwitcher.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FaThLarge } from 'react-icons/fa';
import { FaAlignJustify } from 'react-icons/fa';
import { Icon, IconColor } from '@/shared/ui/Icon/Icon';
import { DataListManagerModules, DisplayType } from '../../model/types/dataListManagerTypes';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonVariant } from '@/shared/ui/Button/Button';
import {
  dataListManagerActions,
  dataListManagerSelectors,
} from '../../model/slices/dataListManagerSlice/dataListManagerSlice';

interface DisplaySwitcherProps {
  className?: string;
  children?: React.ReactNode;
  moduleName: DataListManagerModules;
}

export const DisplaySwitcher: FC<DisplaySwitcherProps> = memo((props) => {
  const { className = '', moduleName } = props;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const displayTypeByModuleName = useSelector(
    dataListManagerSelectors.selectDisplayTypeByModuleName(moduleName)
  );

  const onDisplayChange = (displayType: DisplayType) => () => {
    dispatch(dataListManagerActions.setDisplayType({ moduleName, displayType }));
  };

  return (
    <div className={classNames(cls.DisplaySwitcher, {}, [className])}>
      <div className={cls['display-switcher-contaner']}>
        <Button variant={ButtonVariant.TEXT} onClick={onDisplayChange(DisplayType.CARD)}>
          <Icon
            className={cls['display-switcher-item']}
            Svg={FaThLarge}
            color={
              displayTypeByModuleName === DisplayType.CARD ? IconColor.PRIMARY : IconColor.FADED
            }
          />
        </Button>

        <Button variant={ButtonVariant.TEXT} onClick={onDisplayChange(DisplayType.PREVIEW)}>
          <Icon
            className={cls['display-switcher-item']}
            Svg={FaAlignJustify}
            color={
              displayTypeByModuleName === DisplayType.PREVIEW ? IconColor.PRIMARY : IconColor.FADED
            }
          />
        </Button>
      </div>
    </div>
  );
});
