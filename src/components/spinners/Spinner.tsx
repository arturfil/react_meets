import React from 'react';

// Define the allowed values for size and color
type Size = 'sm' | 'md' | 'lg';
type Color = 'primary' | 'secondary' | 'success' | 'danger';

interface Props {
  size?: Size;  // Made optional since you have a default value
  color?: Color; // Made optional since you have a default value
}

interface SizeConfig {
  outer: string;
  middle: string;
  inner: string;
  text: string;
}

interface ColorConfig {
  outer: string;
  middle: string;
  inner: string;
}

const Spinner = ({ size = 'md', color = 'primary' }: Props) => {
  const sizeMap: Record<Size, SizeConfig> = {
    sm: {
      outer: 'w-8 h-8',
      middle: 'w-6 h-6',
      inner: 'w-4 h-4',
      text: 'text-sm',
    },
    md: {
      outer: 'w-12 h-12',
      middle: 'w-9 h-9',
      inner: 'w-6 h-6',
      text: 'text-base',
    },
    lg: {
      outer: 'w-16 h-16',
      middle: 'w-12 h-12',
      inner: 'w-8 h-8',
      text: 'text-lg',
    },
  };

  const colorMap: Record<Color, ColorConfig> = {
    primary: {
      outer: 'border-blue-600',
      middle: 'border-blue-400',
      inner: 'border-blue-300',
    },
    secondary: {
      outer: 'border-gray-600',
      middle: 'border-gray-400',
      inner: 'border-gray-300',
    },
    success: {
      outer: 'border-green-600',
      middle: 'border-green-400',
      inner: 'border-green-300',
    },
    danger: {
      outer: 'border-red-600',
      middle: 'border-red-400',
      inner: 'border-red-300',
    },
  };

  return (
    <div className='mt-10 flex'>
      <div className='mt-8 flex items-center justify-center'>
        {/* Outer ring */}
        <div
          className={`absolute ${sizeMap[size].outer} animate-spin rounded-full border-4 border-l-transparent border-t-transparent ${colorMap[color].outer} `}
          style={{ animationDuration: '2s' }}
          role='status'
        />

        {/* Middle ring */}
        <div
          className={`absolute ${sizeMap[size].middle} animate-spin rounded-full border-4 border-r-transparent border-t-transparent ${colorMap[color].middle} `}
          style={{ animationDuration: '1.5s' }}
        />

        {/* Inner ring */}
        <div
          className={`absolute ${sizeMap[size].inner} animate-spin rounded-full border-4 border-b-transparent border-l-transparent ${colorMap[color].inner} `}
          style={{ animationDuration: '1s' }}
        />

        {/* Pulsing backdrop */}
        <div
          className={`absolute ${sizeMap[size].outer} animate-pulse rounded-full bg-opacity-10 ${colorMap[color].outer.replace('border', 'bg')} `}
        />
        <h2 className='mt-24'>Loading...</h2>
      </div>
    </div>
  );
};

export default Spinner;
