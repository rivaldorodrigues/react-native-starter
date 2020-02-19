import React from 'react';
import { Button, NativeBase, Spinner } from 'native-base';
import { CORES } from '../../assets/cores';
import { StyleSheet } from 'react-native';

interface SpinnerButtonProps extends NativeBase.Button {
  loading: boolean;
  spinnerProps?: NativeBase.Spinner;
}

export default class SpinnerButton extends React.Component<SpinnerButtonProps> {

  render() {
    const { loading } = this.props;
    let content = this.props.children;

    if (loading) {
      content = (
        <Spinner color={styles.spinner.color} {...this.props.spinnerProps} />
      );
    }

    return (
      <Button {...this.props} style={[styles.button, this.props.style]}>
        {content}
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    color: CORES.BACKGROUND,
  },
  button: {
    backgroundColor: CORES.PRIMARIO,
  },
});
