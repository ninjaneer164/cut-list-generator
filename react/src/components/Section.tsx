import { Section } from '@cut-list-generator/core';
import { ChangeEvent, useState } from 'react';
import { setSectionColor } from '../store/cutListSlice';
import { useAppDispatch } from '../store/hooks';

export interface SectionComponentProps {
  section: Section;
}

const SectionComponent = ({ section }: SectionComponentProps) => {
  const [bgColor, setBgColor] = useState<string>(section.color);

  const dispatch = useAppDispatch();

  const onChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      const color = e.target.value;

      if (color) {
        dispatch(setSectionColor({ color, sectionId: section.id }));
        setBgColor(color);
      }
    }
  };

  return (
    <>
      <div
        className="section-name"
        id={`section-${section.id}`}
        style={{
          backgroundColor: bgColor,
        }}
      >
        <span>{section.name}</span>
        {
          <input
            type="color"
            value={bgColor}
            onChange={(e) => onChangeColor(e)}
            data-section-id={`section-${section.id}`}
          />
        }
      </div>
    </>
  );
};

export { SectionComponent };
