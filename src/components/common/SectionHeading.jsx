/**
 * SectionHeading — Reusable section heading with badge, title, and subtitle.
 */
export default function SectionHeading({ badge, title, subtitle, centered = true }) {
  return (
    <div className={`max-w-3xl ${centered ? 'mx-auto text-center' : ''} mb-12 lg:mb-16`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-4 ${centered ? '' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-primary-400" />
          <span className="text-xs font-medium text-main/60 uppercase tracking-wider">{badge}</span>
        </div>
      )}
      <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl 4k:text-6xl text-main leading-tight mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-main/50 leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
