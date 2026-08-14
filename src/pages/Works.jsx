import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadPortfolioData } from '../utils/contentLoader';
import CompassWidget from '../components/CompassWidget';
import ClockWidget from '../components/ClockWidget';
import WeatherWidget from '../components/WeatherWidget';
import ImagePlaceholder from '../components/ImagePlaceholder';
import PhoneWidgetDashboard from '../components/PhoneWidgetDashboard';
import TransitionImage from '../components/TransitionImage';

// Framer Motion Variants for Staggered Details Reveal
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12 // 120ms Children Stagger
    }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] // Primary easing
    }
  }
};

// Variants for Main List Grid Entrance
const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const titleRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Works() {
  const { projectId } = useParams();
  const [data] = useState(() => loadPortfolioData());

  const { works } = data;

  // 1. If we are on a project detail page
  if (projectId) {
    const work = works.find(w => w.id === projectId);
    if (!work) {
      return (
        <div className="w-full min-h-[50vh] flex flex-col items-center justify-center gap-4 text-left px-6">
          <p className="font-mono text-sm text-neutral-500">Project "{projectId}" not found.</p>
          <Link to="/works" className="text-xs uppercase underline tracking-widest text-neutral-400 hover:text-white">
            View All Works
          </Link>
        </div>
      );
    }

    const currentIdx = works.findIndex(w => w.id === projectId);
    const nextWork = works[(currentIdx + 1) % works.length];
    const prevWork = works[(currentIdx - 1 + works.length) % works.length];

    const renderImagesGrid = () => {
      const images = work.images || [];
      if (images.length === 0) {
        return (
          <div className="p-8 md:p-[5vw] w-full flex items-stretch">
            <ImagePlaceholder 
              description={work.placeholder}
              className="w-full h-full !min-h-[300px] !rounded-none transition-transform duration-300 group-hover:scale-[1.04]"
            />
          </div>
        );
      }

      const count = Math.min(images.length, 6);
      const visibleImages = images.slice(0, count);

      if (count === 1) {
        return (
          <div className="group w-full overflow-hidden flex items-stretch">
            <TransitionImage 
              src={visibleImages[0]} 
              alt={`${work.title} - 1`} 
              style={{ viewTransitionName: `project-image-${work.id}` }}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            />
          </div>
        );
      }

      if (count === 2) {
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            <div className="group border-b lg:border-b-0 lg:border-r border-neutral-200/50 dark:border-neutral-900 flex items-stretch">
              <TransitionImage 
                src={visibleImages[0]} 
                alt={`${work.title} - 1`} 
                style={{ viewTransitionName: `project-image-${work.id}` }}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]" 
              />
            </div>
            <div className="group flex items-stretch">
              <TransitionImage src={visibleImages[1]} alt={`${work.title} - 2`} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
            </div>
          </div>
        );
      }

      if (count === 3) {
        return (
          <div className="flex flex-col gap-0 w-full items-stretch">
            <div className="group border-b border-neutral-200/50 dark:border-neutral-900 flex items-stretch">
              <TransitionImage 
                src={visibleImages[0]} 
                alt={`${work.title} - 1`} 
                style={{ viewTransitionName: `project-image-${work.id}` }}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.01]" 
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
              <div className="group border-b lg:border-b-0 lg:border-r border-neutral-200/50 dark:border-neutral-900 flex items-stretch">
                <TransitionImage src={visibleImages[1]} alt={`${work.title} - 2`} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
              </div>
              <div className="group flex items-stretch">
                <TransitionImage src={visibleImages[2]} alt={`${work.title} - 3`} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
              </div>
            </div>
          </div>
        );
      }

      if (count === 4) {
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
            <div className="group border-b lg:border-r border-neutral-200/50 dark:border-neutral-900 flex items-stretch">
              <TransitionImage 
                src={visibleImages[0]} 
                alt={`${work.title} - 1`} 
                style={{ viewTransitionName: `project-image-${work.id}` }}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]" 
              />
            </div>
            <div className="group border-b border-neutral-200/50 dark:border-neutral-900 flex items-stretch">
              <TransitionImage src={visibleImages[1]} alt={`${work.title} - 2`} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
            </div>
            <div className="group border-b lg:border-b-0 lg:border-r border-neutral-200/50 dark:border-neutral-900 flex items-stretch">
              <TransitionImage src={visibleImages[2]} alt={`${work.title} - 3`} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
            </div>
            <div className="group flex items-stretch">
              <TransitionImage src={visibleImages[3]} alt={`${work.title} - 4`} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
            </div>
          </div>
        );
      }

      if (count === 5) {
        return (
          <div className="flex flex-col gap-0 w-full items-stretch">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch border-b border-neutral-200/50 dark:border-neutral-900">
              <div className="group border-b lg:border-b-0 lg:border-r border-neutral-200/50 dark:border-neutral-900 flex items-stretch">
                <TransitionImage 
                  src={visibleImages[0]} 
                  alt={`${work.title} - 1`} 
                  style={{ viewTransitionName: `project-image-${work.id}` }}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]" 
                />
              </div>
              <div className="group flex items-stretch">
                <TransitionImage src={visibleImages[1]} alt={`${work.title} - 2`} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 items-stretch">
              <div className="group border-b lg:border-b-0 lg:border-r border-neutral-200/50 dark:border-neutral-900 flex items-stretch">
                <TransitionImage src={visibleImages[2]} alt={`${work.title} - 3`} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
              </div>
              <div className="group border-b lg:border-b-0 lg:border-r border-neutral-200/50 dark:border-neutral-900 flex items-stretch">
                <TransitionImage src={visibleImages[3]} alt={`${work.title} - 4`} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
              </div>
              <div className="group flex items-stretch">
                <TransitionImage src={visibleImages[4]} alt={`${work.title} - 5`} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
              </div>
            </div>
          </div>
        );
      }

      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
          {visibleImages.map((img, i) => {
            const isLeft = i % 2 === 0;
            const isLastRow = i >= 4;
            return (
              <div 
                key={i} 
                className={`group flex items-stretch ${
                  !isLastRow ? 'border-b border-neutral-200/50 dark:border-neutral-900' : 'border-b lg:border-b-0 border-neutral-200/50 dark:border-neutral-900'
                } ${
                  isLeft ? 'lg:border-r border-neutral-200/50 dark:border-neutral-900' : ''
                }`}
              >
                {i === 0 ? (
                  <TransitionImage 
                    src={img} 
                    alt={`${work.title} - ${i + 1}`} 
                    style={{ viewTransitionName: `project-image-${work.id}` }}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]" 
                  />
                ) : (
                  <TransitionImage src={img} alt={`${work.title} - ${i + 1}`} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-[1.02]" />
                )}
              </div>
            );
          })}
        </div>
      );
    };

    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full py-0 text-left transition-colors duration-300 border-b border-neutral-200/50 dark:border-neutral-900"
      >
        {/* Back Link */}
        <motion.div variants={childVariants} className="p-8 md:p-[5vw] pb-0">
          <Link 
            to="/" 
            viewTransition
            className="text-xs uppercase tracking-widest text-neutral-500 hover:text-[#161618] dark:hover:text-[#eaeaea] inline-block transition-colors"
          >
            <motion.span whileHover={{ y: -2 }} className="inline-block transition-transform">
              &larr; Back to Home
            </motion.span>
          </Link>
        </motion.div>

        {/* Header Grid */}
        <motion.section variants={childVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[5vw] my-0 p-8 md:p-[5vw] border-b border-neutral-200/50 dark:border-neutral-900 items-center">
          <div className="lg:col-span-7 xl:col-span-8">
            <h1 
              style={{ viewTransitionName: `project-title-${work.id}` }}
              className="text-4xl sm:text-5xl md:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-[-0.04em] text-[#161618] dark:text-[#eaeaea] uppercase leading-[0.9] break-words"
            >
              {work.title}
            </h1>
          </div>
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-2 justify-center">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400">Overview</h4>
            <p className="text-sm md:text-base xl:text-lg leading-relaxed text-neutral-500 font-sans max-w-xl">
              {work.overview}
            </p>
          </div>
        </motion.section>

        {/* Mockups Grid / Full Width Image */}
        <motion.section variants={childVariants} className="w-full border-b border-neutral-200/50 dark:border-neutral-900 overflow-hidden">
          {renderImagesGrid()}
        </motion.section>

        {/* Metadata Details */}
        <motion.section variants={childVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-b border-neutral-200/50 dark:border-neutral-900 w-full items-stretch">
          {/* Metadata */}
          <div className="p-8 md:p-[5vw] border-b lg:border-b-0 lg:border-r border-neutral-200/50 dark:border-neutral-900 grid grid-cols-3 lg:grid-cols-1 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Year</span>
              <p className="text-sm font-bold text-[#161618] dark:text-[#eaeaea]">{work.year}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Role</span>
              {work.role.map((r, i) => (
                <p key={i} className="text-sm font-bold text-[#161618] dark:text-[#eaeaea]">{r}</p>
              ))}
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">Services</span>
              {work.services.map((s, i) => (
                <p key={i} className="text-sm font-bold text-[#161618] dark:text-[#eaeaea]">{s}</p>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="lg:col-span-2 p-8 md:p-[5vw] flex flex-col gap-4">
            <h3 className="text-lg md:text-xl font-bold text-[#161618] dark:text-[#eaeaea]">
              About the project
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-neutral-500 font-sans">
              {work.about}
            </p>
          </div>
        </motion.section>

        {/* Navigation Controls */}
        <motion.div variants={childVariants} className="flex justify-between items-center p-8 md:p-[5vw]">
          <Link 
            to={`/works/${prevWork.id}`}
            viewTransition
            className="text-xs md:text-sm font-semibold tracking-wider text-neutral-450 dark:text-neutral-400 hover:text-[#161618] dark:hover:text-[#eaeaea] transition-colors uppercase"
          >
            <motion.span whileHover={{ y: -2 }} className="inline-block transition-transform">
              &larr; PREV
            </motion.span>
          </Link>
          <Link 
            to={`/works/${nextWork.id}`}
            viewTransition
            className="text-xs md:text-sm font-semibold tracking-wider text-neutral-450 dark:text-neutral-400 hover:text-[#161618] dark:hover:text-[#eaeaea] transition-colors uppercase"
          >
            <motion.span whileHover={{ y: -2 }} className="inline-block transition-transform">
              NEXT &rarr;
            </motion.span>
          </Link>
        </motion.div>

      </motion.div>
    );
  }

  // 2. Default works list if no projectId parameter
  const allWorks = works;

  return (
    <div className="w-full py-0 text-left transition-colors duration-300">
      <div className="p-8 md:p-[5vw] border-b border-neutral-200/50 dark:border-neutral-900">
        <motion.h1 
          variants={titleRevealVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-5xl font-black tracking-[-0.04em] text-neutral-900 dark:text-neutral-100 uppercase mb-4"
        >
          Selected Works
        </motion.h1>
        <motion.p 
          variants={titleRevealVariants}
          initial="hidden"
          animate="visible"
          className="text-neutral-500 max-w-xl font-sans"
        >
          A list of branding projects, industrial UI design widgets, and premium packaging design concepts developed over the years.
        </motion.p>
      </div>

      {/* Grid List with Entrance animations on scroll */}
      <motion.div 
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15% 0px" }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full"
      >
        {allWorks.map((work, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <motion.div 
              key={work.id} 
              variants={cardVariants} 
              className={`group p-8 md:p-[5vw] flex flex-col justify-between border-b border-neutral-200/50 dark:border-neutral-900 ${
                isLeft ? 'lg:border-r' : ''
              }`}
            >
              <Link to={`/works/${work.id}`} viewTransition className="block">
                <div className="rounded-none overflow-hidden border border-neutral-200/50 dark:border-neutral-900/60 shadow-sm flex items-stretch aspect-video">
                  {work.image ? (
                    <TransitionImage 
                      src={work.image} 
                      alt={work.title} 
                      style={{ viewTransitionName: `project-image-${work.id}` }}
                      className="w-full h-full object-cover rounded-none transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <ImagePlaceholder 
                      description={work.placeholder} 
                      className="w-full h-full !min-h-0 !rounded-none transition-transform duration-300 group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <div className="flex justify-between items-start mt-6">
                  <div className="flex-grow pr-4 text-left">
                    <h3 
                      style={{ viewTransitionName: `project-title-${work.id}` }}
                      className="text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:underline transition-transform duration-300 ease-out group-hover:translate-x-[6px] inline-block"
                    >
                      {work.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-1">
                      {work.category}
                    </p>
                    <p className="text-xs text-neutral-400 mt-2 font-sans line-clamp-2 leading-relaxed">
                      {work.overview}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-neutral-500 shrink-0">{work.year}</span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
