import { Box, Button, ButtonProps, CircularProgress } from "@mui/material";

export default function LoadingButton(
  props: {
    loading: boolean | undefined;
    children: any;
    dataTestId: string;
  } & ButtonProps
) {
  const { loading, dataTestId, children, ...restProps } = props;
  return (
    <Box position="relative">
      <Button
        fullWidth
        variant="contained"
        disabled={loading}
        data-test={dataTestId}
        {...restProps}
      >
        {children}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            mt: -1.5,
            ml: -1.5,
          }}
        />
      )}
    </Box>
  );
}
