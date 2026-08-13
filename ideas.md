# Pizzeria & Focacceria Castello — Design Directions

## Approach 1

**Theme Name:** Sunday Paper

**Very Brief Intro:** A bright editorial restaurant identity inspired by Italian weekend supplements, balancing hand-drawn food cues with generous white space. It feels inviting, local, and considered rather than nostalgic.

**Probability:** 0.04

## Approach 2

**Theme Name:** La Pizza Viva

**Very Brief Intro:** A contemporary Italian street-food identity that pairs flame-red accents with warm plaster tones, tactile food photography, and decisive ordering controls. The experience should feel immediate and freshly made.

**Probability:** 0.07

## Approach 3

**Theme Name:** Notte al Forno

**Very Brief Intro:** A cinematic after-dark concept with ember tones, shadowed stone, and intimate table lighting. It would position the pizzeria as an evening ritual rather than a quick takeaway stop.

**Probability:** 0.09

# Chosen Direction: La Pizza Viva

## Design Movement

**Contemporary Italian street-food editorialism.** The app draws from regional pizzeria signage, sun-faded painted façades, and the clarity of modern food magazines. It avoids predictable red-and-green clichés by using a precise tomato-red as an energetic signal within a warm, mineral environment.

## Core Principles

1. **Appetite through tactility:** Food imagery is close, textured, and honest; surfaces recall paper, flour, ceramic, and fired dough.
2. **A single decisive path:** The menu and WhatsApp order action are always easy to find, with no competing conversion routes.
3. **Local over generic:** The composition should feel rooted in Corso Matteotti rather than designed for an anonymous delivery marketplace.
4. **Editorial contrast:** Large expressive headlines meet compact operational information, making the food feel generous and the ordering process reassuringly clear.

## Color Philosophy

Warm ivory is the breathing room, inspired by pizza flour and aged menu cards. Castello red is a high-saturation operational accent reserved for ordering, prices, and selected highlights; it communicates heat, speed, and appetite. Charcoal ink anchors copy and is more grounded than pure black, while an olive-gray secondary tone suggests local ingredients without resorting to Italian-flag symbolism.

## Layout Paradigm

The page moves like a walk past a shopfront: a narrow utility strip introduces the local signal, then an expansive split hero positions food against the order card. The menu is an off-axis series of modular categories rather than a centered card grid. A two-column, editorially staggered rhythm carries the page at desktop; on mobile, it compresses into a clear vertical ordering journey with a persistent order affordance.

## Signature Elements

1. **The ember disc:** A filled red circle, sometimes clipped by an edge, echoes a pizza oven’s heat and provides a recurring anchor.
2. **Order tickets:** Narrow ivory panels with red rule lines and tabular numerals make menu selections feel like a handwritten kitchen ticket.
3. **Ingredient notes:** Small uppercase micro-labels and fine dotted separators add a market-list texture around key editorial blocks.

## Interaction Philosophy

Interactions are functional and warm. Category filters respond immediately; selecting a pizza provides a brief, clear confirmation rather than theatrical animation. The primary order action opens a prefilled WhatsApp conversation only after the user chooses their items, making the preview actionable while preserving a familiar local workflow.

## Animation

Use compact, physics-like movement only: content rises 10–14px into place on initial load with 40–60ms staggered timing; food image hover uses a restrained 1.02 scale; filter changes use opacity and a 180ms transform transition. The ember disc can drift by a few pixels in a long, low-key motion. All non-essential animation must be disabled under reduced-motion preferences.

## Typography System

**Fraunces** is the expressive display face: use it for the main wordmark, hero line, and category titles, with a sturdy, slightly idiosyncratic Italian-market sensibility. **DM Sans** handles navigation, prices, labels, and body text with purposeful clarity. Headlines use high contrast at 600–700 weight, while operational labels use uppercase, generous tracking, and a 0.72rem scale.

## Brand Essence

**Pizzeria & Focacceria Castello brings freshly made pizza, focaccia, and easy local ordering to Castel San Giovanni in a direct, contemporary format.**

**Personality:** Warm, spirited, straightforward.

## Brand Voice

Headlines are appetite-led and concise; CTAs feel like an invitation to order, not a software prompt. Microcopy should be operational, kind, and specific.

> “Your next slice starts here.”

> “Open the menu. Send the order. We’ll fire it up.”

## Wordmark & Logo

The wordmark uses a custom-feeling, high-contrast serif treatment for **Castello**, paired with a small italic “Pizzeria & Focacceria” descriptor. The symbol is a simple, bold oven-arch and pizza-disc mark: an imperfect semicircular arch framing an off-center red disc. It must work without accompanying text at favicon scale.

## Signature Brand Color

**Castello Red — #D53A22.** A fired-tomato red that expresses the oven’s energy and drives the primary order interactions.

## Style Decisions

- Use the hero food image only once and crop it into an asymmetric right-side panel with a dark overlay behind all text.
- Keep functional order details visibly distinct from the editorial food storytelling through ticket-like rules and tabular numerals.
- Avoid rounded-card repetition; use only modest corner radii on interactive controls and retain crisp editorial edges for content blocks.
