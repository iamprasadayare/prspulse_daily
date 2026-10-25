import { Story, RadarTopic, SavedArticle, AudioEpisode } from '../types';

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story-1',
    category: 'for-you',
    source: 'Google DeepMind',
    sourceIcon: 'neurology',
    timeAgo: '35m ago',
    groundedSourcesCount: 14,
    title: 'Gemini 1.5 Pro Extends Context Window to 2M Tokens with Native Multi-Agent Orchestration Framework',
    summary:
      'Google DeepMind rolls out production context scaling alongside an asynchronous parallel agent protocol designed to orchestrate long-horizon reasoning over production codebases.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBHscsideA8e9vG8OowsyW6M8vY7AxyCjiRw8KlOcrkyap6S1UoaisybdSRaGxkJ9vvzpo3WWI35FCFdvttkHGCddH8A9PiOF7I2XCUKZTqOIJKRSdMArrKbmVTbIKKYNhSKTxa9kGjLcKnDldGAnpq0qOr3YL0oNiQMRtVhx6axHdA0MTRGikuPkngVokSXHN6NwGVh-unNBU-ttuYct3I-eV1SAKm2DIu5zsf172IPJUW8OSBt86d',
    imageAlt: 'Futuristic high-tech visual representation of neural network token pipelines with luminous blue Google-inspired light paths',
    badgeOverlay: '2.0M Ctx',
    highlightsTitle: 'Developer Highlights',
    highlights: [
      'Native function calling latency reduced by 48% across distributed cloud microservices with streaming token tool calling.',
      'Long-context retrieval benchmark scores 99.7% needle-in-a-haystack recall across the full 2M token span.',
      'Direct Google Cloud Vertex AI SDK integration is available today with multi-modal audio/video telemetry.',
    ],
    roleInsights: {
      'Founder / Exec': {
        leadImpact: 'Unit economics & Moats',
        description:
          'Eliminates brittle vector ingestion infrastructure, cutting enterprise onboarding lead times from 3 weeks to 1 day and boosting gross margins by 38% via context prefix caching.',
        icon: 'rocket_launch',
      },
      'Software Engineer': {
        leadImpact: 'Architecture impact',
        description:
          'You can now eliminate intermediate vector databases for medium-sized repositories (<1.5M tokens) and execute unified multi-turn code refactoring across entire monorepos without chunking loss.',
        icon: 'psychology',
      },
      'Product Manager': {
        leadImpact: 'Roadmap & User workflows',
        description:
          'Unlocks instant zero-friction repository onboarding for new users, removing document chunking errors and driving week-1 activation retention up by an estimated 28%.',
        icon: 'explore',
      },
    },
    coverageCount: 18,
    coverageItems: [
      {
        id: 'cov-1',
        source: 'Google DeepMind Blog',
        sourceType: 'Official',
        title: 'Scaling Long-Horizon Multi-Agent Reasoning in Production',
        timeAgo: '35m ago',
        keyTakeaway: 'Details the asynchronous dispatch protocol and token budget management for parallel sub-agents.',
        sentiment: 'Bullish',
      },
      {
        id: 'cov-2',
        source: 'arXiv CS.AI Preprint',
        sourceType: 'Paper',
        title: 'Evaluating Needle-in-a-Haystack Retrieval Beyond 1.5 Million Tokens',
        timeAgo: '1h ago',
        keyTakeaway: 'Validates 99.7% precision across 2M token spans without quality degradation.',
        sentiment: 'Bullish',
      },
      {
        id: 'cov-3',
        source: 'Hacker News (342 points)',
        sourceType: 'Community',
        title: 'Discussion: Replacing RAG with 2M Token Context in Monorepos',
        timeAgo: '2h ago',
        keyTakeaway: 'Top engineers debate latency vs vector database cost trade-offs in production.',
        sentiment: 'Neutral',
      },
      {
        id: 'cov-4',
        source: 'VentureBeat AI',
        sourceType: 'Industry',
        title: 'Google deepens enterprise push with long-context multi-agent API',
        timeAgo: '3h ago',
        keyTakeaway: 'Enterprise customers in finance and healthcare report significant time savings.',
        sentiment: 'Bullish',
      },
    ],
    fullContent: {
      overview:
        'Google DeepMind has introduced context scaling up to 2 million tokens for Gemini 1.5 Pro, accompanied by a native multi-agent orchestration protocol. This update targets software engineering workflows where entire repositories, documentation sets, and historical telemetry can be passed in a single prompt.',
      architectureDetails: [
        'Asynchronous sub-agent dispatch enables parallel tool calling without blocking the primary reasoning thread.',
        'KV-cache prefix sharing allows reusing large monorepo context blocks across multiple sequential requests at a 75% cost discount.',
        'Zero-copy token streaming drastically reduces time-to-first-token down to sub-800ms even for 1M+ token inputs.',
      ],
      codeSnippet: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: [
    { text: 'Analyze this full monorepo architecture and identify latency bottlenecks:' },
    { inlineData: { data: monorepoZipBase64, mimeType: 'application/zip' } }
  ],
  config: {
    systemInstruction: 'You are a principal systems architect. Provide exact file paths and PR patches.'
  }
});`,
      benchmarks: [
        { label: 'Needle Recall', value: '99.7%', delta: '+4.2%' },
        { label: 'Tool Latency', value: '310ms', delta: '-48%' },
        { label: 'Prefix Cache Hit', value: '88.4%', delta: '+22%' },
      ],
    },
    tags: ['Gemini 1.5 Pro', 'Context Window', 'Multi-Agent', 'Vertex AI', 'DeepMind'],
  },
  {
    id: 'story-2',
    category: 'cloud-and-infra',
    source: 'Hugging Face & PyTorch',
    sourceIcon: 'memory',
    timeAgo: '2h ago',
    groundedSourcesCount: 8,
    title: 'vLLM v0.6 Released with PagedAttention v3: 2.7x Throughput Spike for MoE Models',
    summary:
      'The latest serving engine update slashes first-token time down to 12ms and supports multi-LoRA switching on concurrent high-volume batch queries.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBb9tOSN3TeGeZjItwTv37Ve9-mTssVWgb04H_XhS6G-sbgdivh-ZMqVaj2EUuaVRZMuPSQ0egJPURDUVkHhrtL5ZnuHYAXcdJRpiYpC113Eec56Kj0D3UJqspH0lHVmRBeZk1Gb8L1i0e_i_pjo3y0KjmHuk3IfNmT8Ub9S-6WxDpPAfNeYyoPMlnU_mAQhQVjcNOD__N9NSBRv-h7Pmm-jNkZYOx8JPpg5XSSiZUMKdvEuHKfRhz4',
    imageAlt: 'Technical chart diagram representing high speed GPU cluster memory throughput benchmarks',
    badgeOverlay: '2.7x Spk',
    highlightsTitle: 'Optimization Highlights',
    highlights: [
      'Kernel-level optimizations: Custom CUDA kernels for FlashAttention-3 provide zero-copy memory swapping.',
      'OpenAI spec compliant: Drop-in proxy replacement with continuous batching and speculative decoding.',
    ],
    roleInsights: {
      'Founder / Exec': {
        leadImpact: 'Cloud OpEx reduction',
        description:
          'Doubles concurrent serving capacity per H100 GPU pod, slashing baseline compute hosting spend by 54% without requiring proprietary closed-source vendors.',
        icon: 'rocket_launch',
      },
      'Software Engineer': {
        leadImpact: 'Deployment optimization',
        description:
          'Drastically cuts inference GPU memory overhead on H100 clusters; drop-in replacement for existing OpenAI-compatible serving endpoints.',
        icon: 'speed',
      },
      'Product Manager': {
        leadImpact: 'Latency SLAs & UX',
        description:
          'Reduces first-token latency down to 12ms, enabling true conversational responsiveness and interactive streaming UI without perceivable loading spinners.',
        icon: 'explore',
      },
    },
    coverageCount: 11,
    coverageItems: [
      {
        id: 'cov-2-1',
        source: 'vLLM GitHub Release v0.6.0',
        sourceType: 'Official',
        title: 'Release Notes: PagedAttention v3 & FlashAttention-3 Kernel Fusion',
        timeAgo: '2h ago',
        keyTakeaway: 'Full changelog detailing continuous batching and FP8 MoE kernel speedups.',
        sentiment: 'Bullish',
      },
      {
        id: 'cov-2-2',
        source: 'PyTorch Developer Forum',
        sourceType: 'Community',
        title: 'Benchmarking vLLM v0.6 against TensorRT-LLM on 8x H100 SXM5',
        timeAgo: '3h ago',
        keyTakeaway: 'Shows 2.7x token per second throughput increase under concurrency load.',
        sentiment: 'Bullish',
      },
    ],
    fullContent: {
      overview:
        'The vLLM team has shipped version 0.6.0, incorporating PagedAttention v3 with optimized CUDA kernels tailored for Mixture-of-Experts (MoE) architectures such as Mixtral, DeepSeek, and Grok.',
      architectureDetails: [
        'Zero-copy memory management prevents GPU RAM fragmentation during high-burst requests.',
        'Integrated speculative decoding with draft models yields an additional 1.8x speedup on coding tasks.',
        'Multi-LoRA adapter switching in under 2ms enables multi-tenant fine-tuning on a single cluster.',
      ],
      benchmarks: [
        { label: 'MoE Throughput', value: '4,280 tok/s', delta: '+170%' },
        { label: 'First-token TTFT', value: '12ms', delta: '-65%' },
        { label: 'Max Concurrency', value: '128 req/GPU', delta: '+160%' },
      ],
    },
    tags: ['vLLM', 'PagedAttention', 'PyTorch', 'GPU Inference', 'CUDA', 'MoE'],
  },
  {
    id: 'story-3',
    category: 'agentic-ai',
    source: 'W3C & Chrome Dev',
    sourceIcon: 'public',
    timeAgo: '4h ago',
    groundedSourcesCount: 6,
    title: 'Prompt API for Gemini Nano in Chrome Reaches Early Preview for Local Web AI Tasks',
    summary:
      'Developers can now execute client-side text summarization, proofreading, and intent classification directly inside Chrome without sending network payloads to external servers.',
    roleInsights: {
      'Founder / Exec': {
        leadImpact: 'Zero marginal cost',
        description:
          'Enables enterprise-grade AI capabilities for 100% of your free-tier user base with literally $0.00 in cloud token inference costs and instant regulatory privacy compliance.',
        icon: 'rocket_launch',
      },
      'Software Engineer': {
        leadImpact: 'Zero-cost client execution',
        description:
          'Enables offline-ready web applications and sensitive client-data processing while completely bypassing API cloud token costs.',
        icon: 'terminal',
      },
      'Product Manager': {
        leadImpact: 'Offline usability & Privacy',
        description:
          'Guarantees end-to-end data residency compliance (HIPAA/GDPR) out of the box, opening enterprise sales cycles that previously stalled on data privacy hurdles.',
        icon: 'explore',
      },
    },
    coverageCount: 9,
    coverageItems: [
      {
        id: 'cov-3-1',
        source: 'Chrome Developers Blog',
        sourceType: 'Official',
        title: 'Built-in AI in Chrome: Early Preview of the Prompt API',
        timeAgo: '4h ago',
        keyTakeaway: 'Step-by-step developer guide on using window.ai to run Gemini Nano locally.',
        sentiment: 'Bullish',
      },
      {
        id: 'cov-3-2',
        source: 'W3C Web Incubator Group',
        sourceType: 'Official',
        title: 'Web Platform Specification: Local Large Language Model Execution',
        timeAgo: '5h ago',
        keyTakeaway: 'Standard proposal for standardized browser-level LLM inference APIs.',
        sentiment: 'Neutral',
      },
    ],
    fullContent: {
      overview:
        'Google Chrome has launched an origin trial for the Prompt API, exposing Gemini Nano directly to web applications via standard JavaScript interfaces without third-party extension overhead.',
      architectureDetails: [
        'Model weights reside securely in the browser cache, downloading once in the background.',
        'WebGPU hardware acceleration utilizes local Apple Silicon, Intel, AMD, or Qualcomm NPUs.',
        'Enforces strict origin isolation preventing prompt injection leaks across tabs.',
      ],
      codeSnippet: `// Check if local Gemini Nano is ready
if (window.ai && (await window.ai.languageModel.capabilities()).available === 'readily') {
  const session = await window.ai.languageModel.create({
    systemPrompt: 'Summarize engineering text in 2 concise sentences.'
  });
  const summary = await session.prompt(userText);
  console.log(summary);
}`,
      benchmarks: [
        { label: 'Local TTFT', value: '8ms', delta: '-92%' },
        { label: 'Cloud Cost', value: '$0.00', delta: '-100%' },
        { label: 'Memory Footprint', value: '1.4 GB', delta: 'Standard' },
      ],
    },
    tags: ['Gemini Nano', 'Chrome', 'WebGPU', 'Client AI', 'W3C'],
  },
  {
    id: 'story-4',
    category: 'product-and-strategy',
    source: 'Gartner & Andreessen Horowitz',
    sourceIcon: 'insights',
    timeAgo: '6h ago',
    groundedSourcesCount: 12,
    title: 'Enterprise AI Architecture Index 2025: Autonomous Code PR Workflows Reach 64% Adoption',
    summary:
      'Cross-industry survey of 1,200 tech enterprises reveals that multi-turn agentic PR reviews have overtaken standalone code completion plugins as the primary driver of engineering velocity.',
    roleInsights: {
      'Founder / Exec': {
        leadImpact: 'Enterprise ROI',
        description:
          'Engineering cycle time drops by 41% across engineering organizations, directly compounding feature delivery speed while avoiding headcount bloat.',
        icon: 'rocket_launch',
      },
      'Software Engineer': {
        leadImpact: 'Workflow automation',
        description:
          'Automated agentic review bots now draft integration tests, verify schema migrations, and highlight breaking API contracts before human review.',
        icon: 'terminal',
      },
      'Product Manager': {
        leadImpact: 'Sprint velocity & Predictability',
        description:
          'PR review bottlenecks drop by 41%, eliminating end-of-sprint blockers and stabilizing release dates for cross-functional launch commitments.',
        icon: 'explore',
      },
    },
    coverageCount: 14,
    tags: ['Enterprise AI', 'DevOps', 'Code Agents', 'Productivity'],
  },
];

export const INITIAL_RADAR_TOPICS: RadarTopic[] = [
  {
    id: 'radar-1',
    icon: '🤖',
    name: 'Agentic Frameworks',
    frequency: '12/day',
    enabled: true,
    category: 'Architecture',
  },
  {
    id: 'radar-2',
    icon: '⚡',
    name: 'Latency & Inference Benchmarks',
    frequency: '5/day',
    enabled: true,
    category: 'Performance',
  },
  {
    id: 'radar-3',
    icon: '🛡️',
    name: 'AI Security & Red-Teaming',
    frequency: '3/day',
    enabled: true,
    category: 'Security',
  },
  {
    id: 'radar-4',
    icon: '⚖️',
    name: 'Open Source LLM Weights',
    frequency: '8/day',
    enabled: true,
    category: 'Models',
  },
  {
    id: 'radar-5',
    icon: '🚀',
    name: 'Triton & CUDA Optimizations',
    frequency: '6/day',
    enabled: false,
    category: 'Hardware',
  },
];

export const INITIAL_SAVED_ARTICLES: SavedArticle[] = [
  {
    id: 'saved-1',
    title: 'System Design: Fault-Tolerant Distributed RAG Architecture',
    source: 'MIT Tech Review',
    readTime: '7m read',
    savedAt: 'Today',
    category: 'Architecture',
  },
  {
    id: 'saved-2',
    title: 'KV Cache Compression Techniques in Modern Production',
    source: 'arXiv AI',
    readTime: '12m read',
    savedAt: 'Yesterday',
    category: 'Infrastructure',
  },
  {
    id: 'saved-3',
    title: 'Comparing Llama 3.2 1B/3B on Edge Devices vs WebAssembly',
    source: 'Latent Space',
    readTime: '5m read',
    savedAt: '2 days ago',
    category: 'Edge AI',
  },
];

export const DAILY_AUDIO_EPISODE: AudioEpisode = {
  id: 'ep-142',
  number: 142,
  title: 'Executive AI Briefing: Context Scaling, vLLM PagedAttention v3 & Claude Computer Use',
  duration: '02:18',
  durationSeconds: 138,
  summary:
    'AI-narrated synthesis of top engineering pull requests and architecture papers.',
  script:
    'Good morning. Here is your Google PulseDaily audio briefing for Wednesday, October 24th. Top story: Google DeepMind extends Gemini 1.5 Pro context window to 2 million tokens with a native multi-agent orchestration framework. Engineering benchmarks report a 48% latency drop in function calling. Next: vLLM version 0.6 introduces PagedAttention version 3 with FlashAttention-3 kernels, yielding a 2.7x throughput increase for Mixture of Experts serving. In client news: Chrome enables the Prompt API for Gemini Nano, allowing client-side zero-cost summarization. Lastly: Anthropic reveals autonomous computer use for Claude 3.5 Sonnet. This concludes your 60-second executive technical brief.',
};
