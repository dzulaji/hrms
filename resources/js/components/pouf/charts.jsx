import {
  AreaChart as RAreaChart,
  BarChart as RBarChart,
  LineChart as RLineChart,
  PieChart as RPieChart,
  Area,
  Bar,
  Line,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function PoufTooltip({
  active,
  payload,
  label
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="pouf-chart__tooltip">
      {label && <div className="pouf-chart__tooltip__label">{label}</div>}
      {payload.map((entry, i) => (
        <div key={i} className="pouf-chart__tooltip__item">
          <span className="pouf-chart__tooltip__swatch" style={{ background: entry.color }} />
          <span>{entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}</span>
        </div>
      ))}
    </div>
  );
}

/** Maps a Tone to a corresponding chart color, falling back to --purple. */
function chartColor(tone) {
  const m = {
    purple: '#c9a8ff',
    pink: '#ffb3d1',
    blue: '#9ec8ff',
    mint: '#a8f0d0',
    yellow: '#ffe58a',
    orange: '#ffb38a',
    up: '#a8f0d0',
    down: '#ffb3d1',
    warn: '#ffe58a',
    info: '#9ec8ff',
    idle: '#c9a8ff',
  }
  return m[tone ?? 'purple'] ?? m.purple;
}

export function AreaChart({
  data,
  dataKey,
  series,
  height = 300,
  stacked
}) {
  return (
    <div className="pouf-chart">
      <ResponsiveContainer width="100%" height={height}>
        <RAreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="pouf-chart__grid" />
          <XAxis dataKey={dataKey} tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} tickMargin={4} width={40} />
          <Tooltip content={<PoufTooltip />} />
          {series.map((s) => (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label ?? s.key}
              stroke={chartColor(s.tone)}
              fill={chartColor(s.tone)}
              fillOpacity={0.25}
              strokeWidth={2.5}
              stackId={stacked ? '1' : undefined}
            />
          ))}
        </RAreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function BarChart({
  data,
  dataKey,
  series,
  height = 300,
  stacked,
  toneKey
}) {
  return (
    <div className="pouf-chart">
      <ResponsiveContainer width="100%" height={height}>
        <RBarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="pouf-chart__grid" vertical={false} />
          <XAxis dataKey={dataKey} tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} tickMargin={4} width={40} />
          <Tooltip content={<PoufTooltip />} />
          {series.map((s) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label ?? s.key}
              fill={chartColor(s.tone)}
              radius={[6, 6, 0, 0]}
              stackId={stacked ? '1' : undefined}
            >
              {toneKey &&
                series.length === 1 &&
                data.map((d, i) => <Cell key={i} fill={chartColor(d[toneKey])} />)}
            </Bar>
          ))}
        </RBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LineChart({
  data,
  dataKey,
  series,
  height = 300
}) {
  return (
    <div className="pouf-chart">
      <ResponsiveContainer width="100%" height={height}>
        <RLineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="pouf-chart__grid" />
          <XAxis dataKey={dataKey} tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickLine={false} axisLine={false} tickMargin={4} width={40} />
          <Tooltip content={<PoufTooltip />} />
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label ?? s.key}
              stroke={chartColor(s.tone)}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          ))}
        </RLineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function PieChart({
  data,
  height = 280,
  donut = true,
  labelled
}) {
  return (
    <div className="pouf-chart">
      <ResponsiveContainer width="100%" height={height}>
        <RPieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Tooltip content={<PoufTooltip />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={donut ? 64 : 0}
            outerRadius={donut ? 100 : 110}
            paddingAngle={3}
            strokeWidth={0}
            label={labelled ? ({ name, value }) => `${name} (${value})` : undefined}
          >
            {data.map((slice) => (
              <Cell key={slice.key} fill={chartColor(slice.tone)} />
            ))}
          </Pie>
        </RPieChart>
      </ResponsiveContainer>
    </div>
  )
}
