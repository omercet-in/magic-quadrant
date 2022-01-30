import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

import { color } from '../../common/color';
import { Item } from '../../common/model';
import { stayInBoundries } from '../../common/utils';
import { BOUNDARY_VALUES, CHART, LABEL } from '../../common/constants';

import AreaLabel from '../atoms/AreaLabel';

import ItemContext from '../../contexts/ItemContext';

const ChartContainer = styled.div`
  position: relative;
`;

const AreaLabelContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${CHART.HEIGHT}px;
  width: ${CHART.WIDTH}px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
  z-index: -1;
`;

const XAxisText = styled.p`
  position: absolute;
  bottom: -30px;
  font-size: 12px;
`;

const YAxisText = styled.p`
  position: absolute;
  bottom: 3px;
  left: -33px;
  font-size: 12px;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
`;

const AreaLabelContainerTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: ${CHART.WIDTH / 2}px;
  height: ${CHART.HEIGHT / 2 - 10}px;
`;

const AreaLabelContainerBottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  width: ${CHART.WIDTH / 2}px;
  height: ${CHART.HEIGHT / 2 - 10}px;
`;

const ScatterChart = () => {
  const { items, updateVision, updateAbility } = useContext(ItemContext);
  const chartEl = useRef(null);

  const [itemsLength, setItemsLength] = useState(0);

  useEffect(() => {
    const svg = d3
      .select(chartEl.current)
      .append('svg')
      .attr('width', CHART.WIDTH)
      .attr('height', CHART.HEIGHT);

    svg
      .append('line')
      .attr('x1', CHART.WIDTH / 2)
      .attr('y1', 0)
      .attr('x2', CHART.WIDTH / 2)
      .attr('y2', CHART.HEIGHT)
      .style('stroke', color.LIGHT_GREY);

    svg
      .append('line')
      .attr('x1', 0)
      .attr('y1', CHART.HEIGHT / 2)
      .attr('x2', CHART.WIDTH)
      .attr('y2', CHART.HEIGHT / 2)
      .style('stroke', color.LIGHT_GREY);

    svg
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', CHART.HEIGHT)
      .style('stroke', 'black');

    svg
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', CHART.WIDTH)
      .attr('y2', 0)
      .attr('stroke-width', 3)
      .style('stroke', 'black');

    svg
      .append('line')
      .attr('x1', CHART.WIDTH)
      .attr('y1', 0)
      .attr('x2', CHART.WIDTH)
      .attr('y2', CHART.HEIGHT)
      .attr('stroke-width', 3)
      .style('stroke', 'black');

    svg
      .append('line')
      .attr('x1', CHART.WIDTH)
      .attr('y1', CHART.HEIGHT)
      .attr('x2', 0)
      .attr('y2', CHART.HEIGHT)
      .attr('stroke-width', 3)
      .style('stroke', 'black');

    svg
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', CHART.HEIGHT)
      .attr('stroke-width', 3)
      .style('stroke', 'black');
  }, []);

  useEffect(() => {
    const x = d3
      .scaleLinear()
      .domain([BOUNDARY_VALUES.MIN, BOUNDARY_VALUES.MAX])
      .range([0, CHART.WIDTH]);
    const y = d3
      .scaleLinear()
      .domain([BOUNDARY_VALUES.MIN, BOUNDARY_VALUES.MAX])
      .range([CHART.HEIGHT, 0]);

    const svg = d3.select('svg');

    const dots = svg.selectAll('.dot').data(items, (d: Item) => 'dot-' + d.id);
    const labels = svg.selectAll('.label').data(items, (d: Item) => 'label-' + d.id);
    const circles = svg.selectAll('.circle').data(items, (d: Item) => 'circle-' + d.id);

    if (items.length !== itemsLength) {
      const tempDots = dots
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('id', (d) => 'dot' + d.id)
        .attr('cx', (d) => x(d.vision))
        .attr('cy', (d) => y(d.ability))
        .attr('r', 0);

      tempDots.transition().duration(1000).attr('r', 7).attr('fill', color.DARK_BLUE);
      tempDots.call(d3.drag().on('start', startDrag));
      tempDots
        .on('mouseover', () => {
          tempDots.style('cursor', 'grab');
        })
        .on('mouseout', () => {
          tempDots.style('cursor', 'default');
        });

      labels
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', (d) => x(d.vision))
        .attr('y', (d) => y(d.ability))
        .attr('dx', '10px')
        .attr('dy', '15px')
        .attr('font-size', '12px')
        .attr('fill', color.DARK_BLUE)
        .text((d) => d.label);

      circles
        .enter()
        .append('circle')
        .attr('class', 'circle')
        .attr('id', (d) => 'circle' + d.id)
        .attr('cx', (d) => x(d.vision))
        .attr('cy', (d) => y(d.ability))
        .attr('r', 25)
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('fill', 'none')
        .attr('visibility', 'hidden');

      labels.exit().remove();
      dots.exit().transition().attr('r', 0).remove();

      setItemsLength(items.length);
    } else {
      dots.attr('cx', (d) => x(d.vision)).attr('cy', (d) => y(d.ability));

      labels
        .attr('x', (d) => x(d.vision))
        .attr('y', (d) => y(d.ability))
        .text((d) => d.label);

      circles.attr('cx', (d) => x(d.vision)).attr('cy', (d) => y(d.ability));
    }
  }, [items]);

  const getVision = d3
    .scaleLinear()
    .domain([0, CHART.WIDTH])
    .range([BOUNDARY_VALUES.MIN, BOUNDARY_VALUES.MAX]);

  const getAbility = d3
    .scaleLinear()
    .domain([0, CHART.HEIGHT])
    .range([BOUNDARY_VALUES.MAX, BOUNDARY_VALUES.MIN]);

  const startDrag = (event) => {
    const dot = d3.select('#dot' + event.subject.id);
    const circle = d3.select('#circle' + event.subject.id);

    const onDrag = (event, d) => {
      console.log(event.subject.id);

      circle.attr('visibility', 'visible');

      const vision = stayInBoundries(Number(getVision(event.x).toFixed(2)));
      const ability = stayInBoundries(Number(getAbility(event.y).toFixed(2)));

      updateVision(event.subject.id, vision);
      updateAbility(event.subject.id, ability);

      dot
        .raise()
        .attr('cx', (d.x = event.x))
        .attr('cy', (d.y = event.y));
    };

    const endDrag = () => {
      circle.attr('visibility', 'hidden');
    };

    event.on('drag', onDrag).on('end', endDrag);
  };

  return (
    <ChartContainer ref={chartEl}>
      <AreaLabelContainer>
        <AreaLabelContainerTop>
          <AreaLabel label={LABEL.CHALLENGERS} />
        </AreaLabelContainerTop>
        <AreaLabelContainerTop>
          <AreaLabel label={LABEL.LEADERS} />
        </AreaLabelContainerTop>
        <AreaLabelContainerBottom>
          <AreaLabel label={LABEL.NICHE_PLAYERS} />
        </AreaLabelContainerBottom>
        <AreaLabelContainerBottom>
          <AreaLabel label={LABEL.VISIONARIES} />
        </AreaLabelContainerBottom>
      </AreaLabelContainer>
      <XAxisText>{LABEL.COMPLETENESS_OF_VISION}</XAxisText>
      <YAxisText>{LABEL.ABILITY_TO_EXECUTE}</YAxisText>
    </ChartContainer>
  );
};

export default ScatterChart;
